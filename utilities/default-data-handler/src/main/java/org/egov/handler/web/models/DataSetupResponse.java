package org.egov.handler.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DataSetupResponse {
	@JsonProperty("ResponseInfo")
	@Valid
	private ResponseInfo responseInfo = null;

	@JsonProperty("targetTenantId")
	private String targetTenantId = null;

	@JsonProperty("module")
	private String module = null;

	@JsonProperty("schemaCodes")
	@Valid
	private List<String> schemaCodes = null;

	@JsonProperty("onlySchemas")
	private Boolean onlySchemas = Boolean.TRUE;

}
