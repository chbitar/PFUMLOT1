package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.Document;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Document} entity.
 */
public interface DocumentSearchRepository extends ElasticsearchRepository<Document, Long> {
}
