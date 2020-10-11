package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.SuiviModule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link SuiviModule} entity.
 */
public interface SuiviModuleSearchRepository extends ElasticsearchRepository<SuiviModule, Long> {
}
