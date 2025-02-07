import { useQuery } from "react-query";
import { DSSService } from "../../services/elements/DSS";

const useDashoardConfig = (moduleCode, tenantId) => {
  return useQuery(`DSS_DASHBOARD_CONFIG_${moduleCode}`, () => DSSService.getDashboardConfig(moduleCode, tenantId));
};

export default useDashoardConfig;
