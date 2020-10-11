package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.NoteLicence;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NoteLicence} entity.
 */
public interface NoteLicenceSearchRepository extends ElasticsearchRepository<NoteLicence, Long> {
}
