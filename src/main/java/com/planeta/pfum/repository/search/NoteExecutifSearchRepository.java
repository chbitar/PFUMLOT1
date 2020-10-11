package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.NoteExecutif;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NoteExecutif} entity.
 */
public interface NoteExecutifSearchRepository extends ElasticsearchRepository<NoteExecutif, Long> {
}
