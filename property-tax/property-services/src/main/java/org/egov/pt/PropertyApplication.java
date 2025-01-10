package org.egov.pt;


import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.TimeZone;

import org.egov.common.utils.MultiStateInstanceUtil;
import org.egov.encryption.config.EncryptionConfiguration;
import org.egov.tracer.config.TracerConfiguration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.net.ssl.*;

@SpringBootApplication
@ComponentScan(basePackages = { "org.egov.pt", "org.egov.pt.web.controllers" , "org.egov.pt.config","org.egov.pt.repository"})


@Import({ TracerConfiguration.class, MultiStateInstanceUtil.class, EncryptionConfiguration.class })
public class PropertyApplication {

    @Value("${app.timezone}")
    private String timeZone;
    
    @Bean
    public ObjectMapper objectMapper(){
    return new ObjectMapper()
    		.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true)
    		.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
    		.setTimeZone(TimeZone.getTimeZone(timeZone));
    }
    public static void trustSelfSignedSSL() {
        try {
            SSLContext ctx = SSLContext.getInstance("TLS");
            X509TrustManager tm = new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] xcs, String string) throws CertificateException {
                }

                public void checkServerTrusted(X509Certificate[] xcs, String string) throws CertificateException {
                }

                public X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
            };
            ctx.init(null, new TrustManager[]{tm}, null);
            SSLContext.setDefault(ctx);

            // Disable hostname verification
            HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
                public boolean verify(String hostname, javax.net.ssl.SSLSession sslSession) {
                    return true;
                }
            });
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    
    public static void main(String[] args) throws Exception {
        trustSelfSignedSSL();
        SpringApplication.run(PropertyApplication.class, args);
    }
    
}
