package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.AutreDoc;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AutreDoc} entity.
 */
public interface AutreDocSearchRepository extends ElasticsearchRepository<AutreDoc, Long> {
}
