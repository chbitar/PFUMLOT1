package com.planeta.pfum.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link EtudiantsLicenceSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EtudiantsLicenceSearchRepositoryMockConfiguration {

    @MockBean
    private EtudiantsLicenceSearchRepository mockEtudiantsLicenceSearchRepository;

}
