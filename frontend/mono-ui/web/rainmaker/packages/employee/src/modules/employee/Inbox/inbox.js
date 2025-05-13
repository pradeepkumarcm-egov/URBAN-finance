// import JkInbox from "@jagankumar-egov/react-tour/components/Inbox";
import Tooltip from '@material-ui/core/Tooltip';
import commonConfig from "config/common.js";
import JkInbox from "egov-inbox/components/Inbox";
import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";
import MenuButton from "egov-ui-framework/ui-molecules/MenuButton";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { addWflowFileUrl, getLocaleLabels, orderWfProcessInstances, transformById } from "egov-ui-framework/ui-utils/commons";
import ServiceList from "egov-ui-kit/common/common/ServiceList";
import { fetchLocalizationLabel, resetFetchRecords } from "egov-ui-kit/redux/app/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getLocale, getLocalization, getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import Label from "egov-ui-kit/utils/translationNode";
import { TaskDialog } from "egov-workflow/ui-molecules-local";
import React, { Component } from "react";
import { connect } from "react-redux";
import FilterDialog from "./components/FilterDialog";
import "./index.css";

let localizationLabels = transformById(
  JSON.parse(getLocalization("localization_" + getLocale())),
  "code"
);

class Inbox extends Component {
  state = {
    dialogOpen: false,
    actionList: [],
    hasWorkflow: false,
    filterPopupOpen: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { fetchLocalizationLabel } = this.props;
    const tenantId = getTenantId();
    fetchLocalizationLabel(getLocale(), tenantId, tenantId);
  };

  componentWillUnmount = () => {
    const { resetFetchRecords } = this.props;
    resetFetchRecords();
  };

  onDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  componentWillReceiveProps(nextProps) {
    const { menu } = nextProps;
    const workflowList = menu && menu.filter(function(item) { return item.name === "rainmaker-common-workflow"; });
    this.setState({ hasWorkflow: workflowList && workflowList.length > 0 });
    const list = menu && menu.filter(function(item) { return item.url === "card"; });
    this.setState({ actionList: list });
  }

  handleClose = () => {
    this.setState({ filterPopupOpen: false });
  };

  onPopupOpen = () => {
    this.setState({ filterPopupOpen: true });
  };

  getProcessIntanceData = async (pid) => {
    const tenantId = getTenantId();
    const queryObject = [
      { key: "businessIds", value: pid },
      { key: "history", value: true },
      { key: "tenantId", value: tenantId },
    ];
    const payload = await httpRequest("egov-workflow-v2/egov-wf/process/_search?", "", queryObject);
    const processInstances = payload && payload.ProcessInstances && payload.ProcessInstances.length > 0
      ? orderWfProcessInstances(payload.ProcessInstances)
      : [];
    return processInstances;
  };

  onHistoryClick = async (moduleNumber) => {
    const { prepareFinalObject } = this.props;
    const processInstances = await this.getProcessIntanceData(moduleNumber);
    let exclamationMarkIndex;
    if (processInstances && processInstances.length > 0) {
      processInstances.map(function(data, index) {
        if (data.assigner && data.assigner.roles && data.assigner.roles.length > 0) {
          data.assigner.roles.map(function(role) {
            if (role.code === "AUTO_ESCALATE") {
              exclamationMarkIndex = index - 1;
            }
          });
        }
      });
      if (exclamationMarkIndex !== undefined) {
        processInstances[exclamationMarkIndex].isExclamationMark = true;
      }
    }
    if (processInstances && processInstances.length > 0) {
      await addWflowFileUrl(processInstances, prepareFinalObject);
      this.setState({
        dialogOpen: true,
      });
    } else {
      console.error("ERROR");
    }
  };

  render() {
    const { name, history, setRoute, menu, Loading, inboxLoading, inbox, loaded, mdmsGetLoading, errorMessage = "", error = false, ProcessInstances } = this.props;
    const { hasWorkflow } = this.state;
    const a = menu ? menu.filter(function(item) { return item.url === "quickAction"; }) : [];
    const downloadMenu = a.map(function(obj, index) {
      return {
        labelName: obj.displayName,
        labelKey: "ACTION_TEST_" + obj.displayName.toUpperCase().replace(/[._:\-\s\/]/g, "_"),
        link: function() {
          if (obj.navigationURL === "tradelicence/apply") {
            this.props.setRequiredDocumentFlag();
          }
          if (obj.navigationURL && obj.navigationURL.indexOf('digit-ui') !== -1) {
            window.location.href = obj.navigationURL;
            return;
          } else {
            setRoute(obj.navigationURL);
          }
        }.bind(this)
      };
    }.bind(this));

    const { isLoading } = Loading;
    const buttonItems = {
      label: { labelName: "Take Action", labelKey: "INBOX_QUICK_ACTION" },
      rightIcon: "arrow_drop_down",
      props: { variant: "outlined", style: { marginLeft: 5, marginRight: 15, marginTop: 10, backgroundColor: "#FE7A51", color: "#fff", border: "none", height: "40px", width: "200px" } },
      menu: downloadMenu
    };

    let user = Object.assign({}, JSON.parse(localStorage.getItem("user-info")), { auth: localStorage.getItem("token") });

    return (
      <div>
        <div className="rainmaker-topHeader" style={{ marginTop: 15, justifyContent: "space-between" }}>
          {mdmsGetLoading && <LoadingIndicator></LoadingIndicator>}
          <div className="rainmaker-topHeader flex">
            <Label className="landingPageHeader flex-child" label={"CS_LANDING_PAGE_WELCOME_TEXT"} />
            <Label className="landingPageUser flex-child" label={name} />, 
          </div>
        </div>
        {hasWorkflow && inboxLoading && <div>
          <div className="jk-spinner-wrapper">
            <div className="jk-inbox-loader"></div>
          </div>
          <div className="jk-spinner-wrapper">
            <Label label={"CS_INBOX_LOADING_MSG"} />
          </div>
        </div>}
        {!hasWorkflow && !mdmsGetLoading && errorMessage !== "" && error && <div>
          <div className="jk-spinner-wrapper">
            <Label label={errorMessage} />
          </div>
        </div>}

        {hasWorkflow && <JkInbox user={Object.assign({}, user, { permanentCity: commonConfig.tenantId })}
          historyClick={this.onHistoryClick}
          t={function(key) {
            return getLocaleLabels("", key, localizationLabels);
          }}
          historyComp={<div onClick={function() { }} style={{ cursor: "pointer" }}>
            <i className="material-icons">history</i>
          </div>}
          esclatedComp={<Tooltip title={getLocaleLabels("COMMON_INBOX_TAB_ESCALATED", "COMMON_INBOX_TAB_ESCALATED", localizationLabels)} placement="top">
            <span> <i className="material-icons" style={{ color: "rgb(244, 67, 54)" }}>error</i> </span>
          </Tooltip>}
        >
        </JkInbox>}

        <FilterDialog popupOpen={this.state.filterPopupOpen} popupClose={this.handleClose} />
        <TaskDialog open={this.state.dialogOpen} onClose={this.onDialogClose} history={ProcessInstances} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth, app, screenConfiguration } = state;
  const { menu, inbox, actionMenuFetch } = app;
  const inboxLoading = inbox && inbox.loading;
  const loaded = inbox && inbox.loaded;
  const userInfo = auth && auth.userInfo;
  const name = auth && userInfo.name;
  const preparedFinalObject = screenConfiguration && screenConfiguration.preparedFinalObject;
  const Loading = preparedFinalObject && preparedFinalObject.Loading ? preparedFinalObject.Loading : {};
  const workflow = preparedFinalObject && preparedFinalObject.workflow ? preparedFinalObject.workflow : {};
  const ProcessInstances = workflow.ProcessInstances || [];
  const mdmsGetLoading = actionMenuFetch && actionMenuFetch.loading;
  const errorMessage = actionMenuFetch && actionMenuFetch.errorMessage;
  const error = actionMenuFetch && actionMenuFetch.error;
  return { name, menu, Loading, inboxLoading, inbox, loaded, mdmsGetLoading, errorMessage, error, ProcessInstances };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: function(url) { dispatch(setRoute(url)); },
    fetchLocalizationLabel: function(locale, tenantId, module) { dispatch(fetchLocalizationLabel(locale, tenantId, module)); },
    setRequiredDocumentFlag: function() { dispatch(prepareFinalObject("isRequiredDocuments", true)); },
    resetFetchRecords: function() { dispatch(resetFetchRecords()); },
    prepareFinalObject: function(path, value) { dispatch(prepareFinalObject(path, value)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
