package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.EtudiantsExecutif;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EtudiantsExecutif} entity.
 */
public interface EtudiantsExecutifSearchRepository extends ElasticsearchRepository<EtudiantsExecutif, Long> {
}
