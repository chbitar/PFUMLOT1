package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.ModalitePaiement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ModalitePaiement} entity.
 */
public interface ModalitePaiementSearchRepository extends ElasticsearchRepository<ModalitePaiement, Long> {
}
