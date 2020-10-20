package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.NoteExecutif;
import com.planeta.pfum.repository.NoteExecutifRepository;
import com.planeta.pfum.repository.search.NoteExecutifSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.NoteExecutif}.
 */
@RestController
@RequestMapping("/api")
public class NoteExecutifResource {

    private final Logger log = LoggerFactory.getLogger(NoteExecutifResource.class);

    private static final String ENTITY_NAME = "noteExecutif";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoteExecutifRepository noteExecutifRepository;

    private final NoteExecutifSearchRepository noteExecutifSearchRepository;

    public NoteExecutifResource(NoteExecutifRepository noteExecutifRepository, NoteExecutifSearchRepository noteExecutifSearchRepository) {
        this.noteExecutifRepository = noteExecutifRepository;
        this.noteExecutifSearchRepository = noteExecutifSearchRepository;
    }

    /**
     * {@code POST  /note-executifs} : Create a new noteExecutif.
     *
     * @param noteExecutif the noteExecutif to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new noteExecutif, or with status {@code 400 (Bad Request)} if the noteExecutif has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/note-executifs")
    public ResponseEntity<NoteExecutif> createNoteExecutif(@RequestBody NoteExecutif noteExecutif) throws URISyntaxException {
        log.debug("REST request to save NoteExecutif : {}", noteExecutif);
        if (noteExecutif.getId() != null) {
            throw new BadRequestAlertException("A new noteExecutif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NoteExecutif result = noteExecutifRepository.save(noteExecutif);
        noteExecutifSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/note-executifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /note-executifs} : Updates an existing noteExecutif.
     *
     * @param noteExecutif the noteExecutif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated noteExecutif,
     * or with status {@code 400 (Bad Request)} if the noteExecutif is not valid,
     * or with status {@code 500 (Internal Server Error)} if the noteExecutif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/note-executifs")
    public ResponseEntity<NoteExecutif> updateNoteExecutif(@RequestBody NoteExecutif noteExecutif) throws URISyntaxException {
        log.debug("REST request to update NoteExecutif : {}", noteExecutif);
        if (noteExecutif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NoteExecutif result = noteExecutifRepository.save(noteExecutif);
        noteExecutifSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, noteExecutif.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /note-executifs} : get all the noteExecutifs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of noteExecutifs in body.
     */
    @GetMapping("/note-executifs")
    public List<NoteExecutif> getAllNoteExecutifs() {
        log.debug("REST request to get all NoteExecutifs");
        return noteExecutifRepository.findAll();
    }

    /**
     * {@code GET  /note-executifs/:id} : get the "id" noteExecutif.
     *
     * @param id the id of the noteExecutif to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the noteExecutif, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/note-executifs/{id}")
    public ResponseEntity<NoteExecutif> getNoteExecutif(@PathVariable Long id) {
        log.debug("REST request to get NoteExecutif : {}", id);
        Optional<NoteExecutif> noteExecutif = noteExecutifRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(noteExecutif);
    }

    /**
     * {@code DELETE  /note-executifs/:id} : delete the "id" noteExecutif.
     *
     * @param id the id of the noteExecutif to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/note-executifs/{id}")
    public ResponseEntity<Void> deleteNoteExecutif(@PathVariable Long id) {
        log.debug("REST request to delete NoteExecutif : {}", id);
        noteExecutifRepository.deleteById(id);
        noteExecutifSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/note-executifs?query=:query} : search for the noteExecutif corresponding
     * to the query.
     *
     * @param query the query of the noteExecutif search.
     * @return the result of the search.
     */
    @GetMapping("/_search/note-executifs")
    public List<NoteExecutif> searchNoteExecutifs(@RequestParam String query) {
        log.debug("REST request to search NoteExecutifs for query {}", query);
        return StreamSupport
            .stream(noteExecutifSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
