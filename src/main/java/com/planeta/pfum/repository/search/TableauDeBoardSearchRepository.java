package com.planeta.pfum.repository.search;

import com.planeta.pfum.domain.TableauDeBoard;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link TableauDeBoard} entity.
 */
public interface TableauDeBoardSearchRepository extends ElasticsearchRepository<TableauDeBoard, Long> {
}
