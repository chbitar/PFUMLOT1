package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.repository.SuiviModuleRepository;
import com.planeta.pfum.repository.search.SuiviModuleSearchRepository;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.SuiviModule}.
 */
@RestController
@RequestMapping("/api")
public class SuiviModuleResource {

    private final Logger log = LoggerFactory.getLogger(SuiviModuleResource.class);

    private static final String ENTITY_NAME = "suiviModule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SuiviModuleRepository suiviModuleRepository;

    private final SuiviModuleSearchRepository suiviModuleSearchRepository;

    public SuiviModuleResource(SuiviModuleRepository suiviModuleRepository, SuiviModuleSearchRepository suiviModuleSearchRepository) {
        this.suiviModuleRepository = suiviModuleRepository;
        this.suiviModuleSearchRepository = suiviModuleSearchRepository;
    }

    /**
     * {@code POST  /suivi-modules} : Create a new suiviModule.
     *
     * @param suiviModule the suiviModule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new suiviModule, or with status {@code 400 (Bad Request)} if the suiviModule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/suivi-modules")
    public ResponseEntity<SuiviModule> createSuiviModule(@Valid @RequestBody SuiviModule suiviModule) throws URISyntaxException {
        log.debug("REST request to save SuiviModule : {}", suiviModule);
        if (suiviModule.getId() != null) {
            throw new BadRequestAlertException("A new suiviModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SuiviModule result = suiviModuleRepository.save(suiviModule);
        suiviModuleSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/suivi-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /suivi-modules} : Updates an existing suiviModule.
     *
     * @param suiviModule the suiviModule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated suiviModule,
     * or with status {@code 400 (Bad Request)} if the suiviModule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the suiviModule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/suivi-modules")
    public ResponseEntity<SuiviModule> updateSuiviModule(@Valid @RequestBody SuiviModule suiviModule) throws URISyntaxException {
        log.debug("REST request to update SuiviModule : {}", suiviModule);
        if (suiviModule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SuiviModule result = suiviModuleRepository.save(suiviModule);
        suiviModuleSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, suiviModule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /suivi-modules} : get all the suiviModules.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of suiviModules in body.
     */
    @GetMapping("/suivi-modules")
    public List<SuiviModule> getAllSuiviModules() {
        log.debug("REST request to get all SuiviModules");
        return suiviModuleRepository.findAll();
    }

    /**
     * {@code GET  /suivi-modules/:id} : get the "id" suiviModule.
     *
     * @param id the id of the suiviModule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the suiviModule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/suivi-modules/{id}")
    public ResponseEntity<SuiviModule> getSuiviModule(@PathVariable Long id) {
        log.debug("REST request to get SuiviModule : {}", id);
        Optional<SuiviModule> suiviModule = suiviModuleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(suiviModule);
    }

    /**
     * {@code DELETE  /suivi-modules/:id} : delete the "id" suiviModule.
     *
     * @param id the id of the suiviModule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/suivi-modules/{id}")
    public ResponseEntity<Void> deleteSuiviModule(@PathVariable Long id) {
        log.debug("REST request to delete SuiviModule : {}", id);
        suiviModuleRepository.deleteById(id);
        suiviModuleSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/suivi-modules?query=:query} : search for the suiviModule corresponding
     * to the query.
     *
     * @param query the query of the suiviModule search.
     * @return the result of the search.
     */
    @GetMapping("/_search/suivi-modules")
    public List<SuiviModule> searchSuiviModules(@RequestParam String query) {
        log.debug("REST request to search SuiviModules for query {}", query);
        return StreamSupport
            .stream(suiviModuleSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
