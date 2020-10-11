package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.AffectationModule;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AffectationModule} entity.
 */
public interface AffectationModuleSearchRepository extends ElasticsearchRepository<AffectationModule, Long> {
}
