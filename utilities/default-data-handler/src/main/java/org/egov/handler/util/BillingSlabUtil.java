package org.egov.handler.util;

import lombok.extern.slf4j.Slf4j;
import org.egov.handler.config.ServiceConfiguration;
import org.egov.handler.web.models.BillingSlabReq;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Component
public class BillingSlabUtil {
    private final ServiceConfiguration serviceConfig;
    private final RestTemplate restTemplate;

    @Autowired
    public BillingSlabUtil(ServiceConfiguration serviceConfig, RestTemplate restTemplate) {
        this.serviceConfig = serviceConfig;
        this.restTemplate = restTemplate;
    }

    public void createBillingSlabConfig(BillingSlabReq billingSlabReq) {

        StringBuilder uri = new StringBuilder();
        uri.append(serviceConfig.getTlBillingSlabCreateURI());
        try {
            restTemplate.postForObject(uri.toString(), billingSlabReq, Map.class);
        } catch (Exception e) {
            log.error("Error creating Tl billing slab: {}", e.getMessage());
            throw new CustomException("TL_BILLING_SLAB_CREATE_FAILED", "Failed to create TL billing slab : " + e.getMessage());
        }
    }
}
