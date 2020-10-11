package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.NoteMaster;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link NoteMaster} entity.
 */
public interface NoteMasterSearchRepository extends ElasticsearchRepository<NoteMaster, Long> {
}
