package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.Absence;
import com.planeta.pfum.repository.AbsenceRepository;
import com.planeta.pfum.repository.search.AbsenceSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.Absence}.
 */
@RestController
@RequestMapping("/api")
public class AbsenceResource {

    private final Logger log = LoggerFactory.getLogger(AbsenceResource.class);

    private static final String ENTITY_NAME = "absence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AbsenceRepository absenceRepository;

    private final AbsenceSearchRepository absenceSearchRepository;

    public AbsenceResource(AbsenceRepository absenceRepository, AbsenceSearchRepository absenceSearchRepository) {
        this.absenceRepository = absenceRepository;
        this.absenceSearchRepository = absenceSearchRepository;
    }

    /**
     * {@code POST  /absences} : Create a new absence.
     *
     * @param absence the absence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new absence, or with status {@code 400 (Bad Request)} if the absence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/absences")
    public ResponseEntity<Absence> createAbsence(@RequestBody Absence absence) throws URISyntaxException {
        log.debug("REST request to save Absence : {}", absence);
        if (absence.getId() != null) {
            throw new BadRequestAlertException("A new absence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Absence result = absenceRepository.save(absence);
        absenceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/absences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /absences} : Updates an existing absence.
     *
     * @param absence the absence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated absence,
     * or with status {@code 400 (Bad Request)} if the absence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the absence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/absences")
    public ResponseEntity<Absence> updateAbsence(@RequestBody Absence absence) throws URISyntaxException {
        log.debug("REST request to update Absence : {}", absence);
        if (absence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Absence result = absenceRepository.save(absence);
        absenceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, absence.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /absences} : get all the absences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of absences in body.
     */
    @GetMapping("/absences")
    public List<Absence> getAllAbsences() {
        log.debug("REST request to get all Absences");
        return absenceRepository.findAll();
    }

    /**
     * {@code GET  /absences/:id} : get the "id" absence.
     *
     * @param id the id of the absence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the absence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/absences/{id}")
    public ResponseEntity<Absence> getAbsence(@PathVariable Long id) {
        log.debug("REST request to get Absence : {}", id);
        Optional<Absence> absence = absenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(absence);
    }

    /**
     * {@code DELETE  /absences/:id} : delete the "id" absence.
     *
     * @param id the id of the absence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/absences/{id}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long id) {
        log.debug("REST request to delete Absence : {}", id);
        absenceRepository.deleteById(id);
        absenceSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/absences?query=:query} : search for the absence corresponding
     * to the query.
     *
     * @param query the query of the absence search.
     * @return the result of the search.
     */
    @GetMapping("/_search/absences")
    public List<Absence> searchAbsences(@RequestParam String query) {
        log.debug("REST request to search Absences for query {}", query);
        return StreamSupport
            .stream(absenceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
