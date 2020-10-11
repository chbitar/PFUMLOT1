package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.EtudiantsLicence;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EtudiantsLicence} entity.
 */
public interface EtudiantsLicenceSearchRepository extends ElasticsearchRepository<EtudiantsLicence, Long> {
}
