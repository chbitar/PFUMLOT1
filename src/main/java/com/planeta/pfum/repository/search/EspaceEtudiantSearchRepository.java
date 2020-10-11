package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.EspaceEtudiant;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EspaceEtudiant} entity.
 */
public interface EspaceEtudiantSearchRepository extends ElasticsearchRepository<EspaceEtudiant, Long> {
}
