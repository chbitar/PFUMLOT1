package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.Annonce;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Annonce} entity.
 */
public interface AnnonceSearchRepository extends ElasticsearchRepository<Annonce, Long> {
}
