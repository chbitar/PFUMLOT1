package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.Filiere;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Filiere} entity.
 */
public interface FiliereSearchRepository extends ElasticsearchRepository<Filiere, Long> {
}
