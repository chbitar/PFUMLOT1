package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.Professeur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Professeur} entity.
 */
public interface ProfesseurSearchRepository extends ElasticsearchRepository<Professeur, Long> {
}
