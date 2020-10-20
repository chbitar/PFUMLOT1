package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.repository.AffectationModuleRepository;
import com.planeta.pfum.repository.search.AffectationModuleSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.AffectationModule}.
 */
@RestController
@RequestMapping("/api")
public class AffectationModuleResource {

    private final Logger log = LoggerFactory.getLogger(AffectationModuleResource.class);

    private static final String ENTITY_NAME = "affectationModule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AffectationModuleRepository affectationModuleRepository;

    private final AffectationModuleSearchRepository affectationModuleSearchRepository;

    public AffectationModuleResource(AffectationModuleRepository affectationModuleRepository, AffectationModuleSearchRepository affectationModuleSearchRepository) {
        this.affectationModuleRepository = affectationModuleRepository;
        this.affectationModuleSearchRepository = affectationModuleSearchRepository;
    }

    /**
     * {@code POST  /affectation-modules} : Create a new affectationModule.
     *
     * @param affectationModule the affectationModule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectationModule, or with status {@code 400 (Bad Request)} if the affectationModule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectation-modules")
    public ResponseEntity<AffectationModule> createAffectationModule(@RequestBody AffectationModule affectationModule) throws URISyntaxException {
        log.debug("REST request to save AffectationModule : {}", affectationModule);
        if (affectationModule.getId() != null) {
            throw new BadRequestAlertException("A new affectationModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AffectationModule result = affectationModuleRepository.save(affectationModule);
        affectationModuleSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/affectation-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /affectation-modules} : Updates an existing affectationModule.
     *
     * @param affectationModule the affectationModule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectationModule,
     * or with status {@code 400 (Bad Request)} if the affectationModule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the affectationModule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/affectation-modules")
    public ResponseEntity<AffectationModule> updateAffectationModule(@RequestBody AffectationModule affectationModule) throws URISyntaxException {
        log.debug("REST request to update AffectationModule : {}", affectationModule);
        if (affectationModule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AffectationModule result = affectationModuleRepository.save(affectationModule);
        affectationModuleSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectationModule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /affectation-modules} : get all the affectationModules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectationModules in body.
     */
    @GetMapping("/affectation-modules")
    public List<AffectationModule> getAllAffectationModules() {
        log.debug("REST request to get all AffectationModules");
        return affectationModuleRepository.findAll();
    }

    /**
     * {@code GET  /affectation-modules/:id} : get the "id" affectationModule.
     *
     * @param id the id of the affectationModule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectationModule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectation-modules/{id}")
    public ResponseEntity<AffectationModule> getAffectationModule(@PathVariable Long id) {
        log.debug("REST request to get AffectationModule : {}", id);
        Optional<AffectationModule> affectationModule = affectationModuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(affectationModule);
    }

    /**
     * {@code DELETE  /affectation-modules/:id} : delete the "id" affectationModule.
     *
     * @param id the id of the affectationModule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectation-modules/{id}")
    public ResponseEntity<Void> deleteAffectationModule(@PathVariable Long id) {
        log.debug("REST request to delete AffectationModule : {}", id);
        affectationModuleRepository.deleteById(id);
        affectationModuleSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/affectation-modules?query=:query} : search for the affectationModule corresponding
     * to the query.
     *
     * @param query the query of the affectationModule search.
     * @return the result of the search.
     */
    @GetMapping("/_search/affectation-modules")
    public List<AffectationModule> searchAffectationModules(@RequestParam String query) {
        log.debug("REST request to search AffectationModules for query {}", query);
        return StreamSupport
            .stream(affectationModuleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
