package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.CalendrierModule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CalendrierModule} entity.
 */
public interface CalendrierModuleSearchRepository extends ElasticsearchRepository<CalendrierModule, Long> {
}
