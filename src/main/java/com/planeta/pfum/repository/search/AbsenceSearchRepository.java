package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.Absence;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Absence} entity.
 */
public interface AbsenceSearchRepository extends ElasticsearchRepository<Absence, Long> {
}
