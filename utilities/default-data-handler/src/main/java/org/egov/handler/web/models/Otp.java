package org.egov.handler.web.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Otp {

	@JsonProperty("mobileNumber")
	private String mobileNumber;

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("type")
	private String type;

	@JsonProperty("userType")
	private String userType;

	@JsonProperty("userName")
	private String userName;
}
