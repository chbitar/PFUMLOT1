package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.AnneeInscription;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AnneeInscription} entity.
 */
public interface AnneeInscriptionSearchRepository extends ElasticsearchRepository<AnneeInscription, Long> {
}
