package com.planeta.pfum.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link TableauDeBoardSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TableauDeBoardSearchRepositoryMockConfiguration {

    @MockBean
    private TableauDeBoardSearchRepository mockTableauDeBoardSearchRepository;

}
