package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.TableauDeBoard;
import com.planeta.pfum.repository.TableauDeBoardRepository;
import com.planeta.pfum.repository.search.TableauDeBoardSearchRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.TableauDeBoard}.
 */
@RestController
@RequestMapping("/api")
public class TableauDeBoardResource {

    private final Logger log = LoggerFactory.getLogger(TableauDeBoardResource.class);

    private static final String ENTITY_NAME = "tableauDeBoard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TableauDeBoardRepository tableauDeBoardRepository;

    private final TableauDeBoardSearchRepository tableauDeBoardSearchRepository;

    public TableauDeBoardResource(TableauDeBoardRepository tableauDeBoardRepository, TableauDeBoardSearchRepository tableauDeBoardSearchRepository) {
        this.tableauDeBoardRepository = tableauDeBoardRepository;
        this.tableauDeBoardSearchRepository = tableauDeBoardSearchRepository;
    }

    /**
     * {@code POST  /tableau-de-boards} : Create a new tableauDeBoard.
     *
     * @param tableauDeBoard the tableauDeBoard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tableauDeBoard, or with status {@code 400 (Bad Request)} if the tableauDeBoard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tableau-de-boards")
    public ResponseEntity<TableauDeBoard> createTableauDeBoard(@RequestBody TableauDeBoard tableauDeBoard) throws URISyntaxException {
        log.debug("REST request to save TableauDeBoard : {}", tableauDeBoard);
        if (tableauDeBoard.getId() != null) {
            throw new BadRequestAlertException("A new tableauDeBoard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TableauDeBoard result = tableauDeBoardRepository.save(tableauDeBoard);
        tableauDeBoardSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/tableau-de-boards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tableau-de-boards} : Updates an existing tableauDeBoard.
     *
     * @param tableauDeBoard the tableauDeBoard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tableauDeBoard,
     * or with status {@code 400 (Bad Request)} if the tableauDeBoard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tableauDeBoard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tableau-de-boards")
    public ResponseEntity<TableauDeBoard> updateTableauDeBoard(@RequestBody TableauDeBoard tableauDeBoard) throws URISyntaxException {
        log.debug("REST request to update TableauDeBoard : {}", tableauDeBoard);
        if (tableauDeBoard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TableauDeBoard result = tableauDeBoardRepository.save(tableauDeBoard);
        tableauDeBoardSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tableauDeBoard.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tableau-de-boards} : get all the tableauDeBoards.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tableauDeBoards in body.
     */
    @GetMapping("/tableau-de-boards")
    public List<TableauDeBoard> getAllTableauDeBoards(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all TableauDeBoards");
        return tableauDeBoardRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /tableau-de-boards/:id} : get the "id" tableauDeBoard.
     *
     * @param id the id of the tableauDeBoard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tableauDeBoard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tableau-de-boards/{id}")
    public ResponseEntity<TableauDeBoard> getTableauDeBoard(@PathVariable Long id) {
        log.debug("REST request to get TableauDeBoard : {}", id);
        Optional<TableauDeBoard> tableauDeBoard = tableauDeBoardRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(tableauDeBoard);
    }

    /**
     * {@code DELETE  /tableau-de-boards/:id} : delete the "id" tableauDeBoard.
     *
     * @param id the id of the tableauDeBoard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tableau-de-boards/{id}")
    public ResponseEntity<Void> deleteTableauDeBoard(@PathVariable Long id) {
        log.debug("REST request to delete TableauDeBoard : {}", id);
        tableauDeBoardRepository.deleteById(id);
        tableauDeBoardSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/tableau-de-boards?query=:query} : search for the tableauDeBoard corresponding
     * to the query.
     *
     * @param query the query of the tableauDeBoard search.
     * @return the result of the search.
     */
    @GetMapping("/_search/tableau-de-boards")
    public List<TableauDeBoard> searchTableauDeBoards(@RequestParam String query) {
        log.debug("REST request to search TableauDeBoards for query {}", query);
        return StreamSupport
            .stream(tableauDeBoardSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
