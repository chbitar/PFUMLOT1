package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.EtudiantsMaster;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EtudiantsMaster} entity.
 */
public interface EtudiantsMasterSearchRepository extends ElasticsearchRepository<EtudiantsMaster, Long> {
}
