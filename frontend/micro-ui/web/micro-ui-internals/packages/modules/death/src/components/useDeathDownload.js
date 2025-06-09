import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useDeathDownload = (tenantId, id) => {
  const [consumerCode, setConsumerCode] = useState(null);
  const history = useHistory();
  const location = useLocation();

  const downloadMutation = Digit.Hooks.useCustomAPIMutationHook({
    url: "/birth-death-services/death/_download",
    params: {
      tenantId: tenantId,
      id: id,
      source: "web"
    },
    body: {},
    config: {
      enabled: true
    }
  });

  const downloadApi = async () => {
    await downloadMutation.mutate(
      {
        url: "/birth-death-services/death/_download",
        params: {
          tenantId: tenantId,
          id: id,
          source: "web"
        }
      },
      {
        onSuccess: (response) => {
          const code = response?.consumerCode;
          if (code) {
            setConsumerCode(code);
            history.replace({
              ...location,
              state: {
                ...location.state,
                consumerCode: code
              }
            });
          }
          return code; // Return the consumerCode
        },
        onError: (error) => {
          console.error("API Error:", error);
          return null;
        }
      }
    );
  };

  useEffect(() => {
    if (!consumerCode && id && tenantId) {
      downloadApi();
    }
  }, [id, tenantId, consumerCode]);

  return { consumerCode, downloadApi };
};

export default useDeathDownload;