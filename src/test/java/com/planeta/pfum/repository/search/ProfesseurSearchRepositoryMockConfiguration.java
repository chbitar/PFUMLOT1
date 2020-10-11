package com.planeta.pfum.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ProfesseurSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ProfesseurSearchRepositoryMockConfiguration {

    @MockBean
    private ProfesseurSearchRepository mockProfesseurSearchRepository;

}
