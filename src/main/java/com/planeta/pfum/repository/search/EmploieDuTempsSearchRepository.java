package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.EmploieDuTemps;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EmploieDuTemps} entity.
 */
public interface EmploieDuTempsSearchRepository extends ElasticsearchRepository<EmploieDuTemps, Long> {
}
