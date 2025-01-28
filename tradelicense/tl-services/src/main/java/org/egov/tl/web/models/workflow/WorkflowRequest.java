package org.egov.tl.web.models.workflow;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.JSONArray;
import org.egov.common.contract.request.RequestInfo;

import java.util.List;

@Getter
@Setter
public class WorkflowRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("ProcessInstances")
    private JSONArray processInstances;
}
