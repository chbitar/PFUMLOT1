package com.planeta.pfum.web.rest;

import com.planeta.pfum.domain.Etablissement;
import com.planeta.pfum.repository.EtablissementRepository;
import com.planeta.pfum.repository.search.EtablissementSearchRepository;
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
 * REST controller for managing {@link com.planeta.pfum.domain.Etablissement}.
 */
@RestController
@RequestMapping("/api")
public class EtablissementResource {

    private final Logger log = LoggerFactory.getLogger(EtablissementResource.class);

    private static final String ENTITY_NAME = "etablissement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtablissementRepository etablissementRepository;

    private final EtablissementSearchRepository etablissementSearchRepository;

    public EtablissementResource(EtablissementRepository etablissementRepository, EtablissementSearchRepository etablissementSearchRepository) {
        this.etablissementRepository = etablissementRepository;
        this.etablissementSearchRepository = etablissementSearchRepository;
    }

    /**
     * {@code POST  /etablissements} : Create a new etablissement.
     *
     * @param etablissement the etablissement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etablissement, or with status {@code 400 (Bad Request)} if the etablissement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etablissements")
    public ResponseEntity<Etablissement> createEtablissement(@RequestBody Etablissement etablissement) throws URISyntaxException {
        log.debug("REST request to save Etablissement : {}", etablissement);
        if (etablissement.getId() != null) {
            throw new BadRequestAlertException("A new etablissement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Etablissement result = etablissementRepository.save(etablissement);
        etablissementSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/etablissements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etablissements} : Updates an existing etablissement.
     *
     * @param etablissement the etablissement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etablissement,
     * or with status {@code 400 (Bad Request)} if the etablissement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etablissement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etablissements")
    public ResponseEntity<Etablissement> updateEtablissement(@RequestBody Etablissement etablissement) throws URISyntaxException {
        log.debug("REST request to update Etablissement : {}", etablissement);
        if (etablissement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Etablissement result = etablissementRepository.save(etablissement);
        etablissementSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etablissement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etablissements} : get all the etablissements.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etablissements in body.
     */
    @GetMapping("/etablissements")
    public List<Etablissement> getAllEtablissements() {
        log.debug("REST request to get all Etablissements");
        return etablissementRepository.findAll();
    }

    /**
     * {@code GET  /etablissements/:id} : get the "id" etablissement.
     *
     * @param id the id of the etablissement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etablissement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etablissements/{id}")
    public ResponseEntity<Etablissement> getEtablissement(@PathVariable Long id) {
        log.debug("REST request to get Etablissement : {}", id);
        Optional<Etablissement> etablissement = etablissementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etablissement);
    }

    /**
     * {@code DELETE  /etablissements/:id} : delete the "id" etablissement.
     *
     * @param id the id of the etablissement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etablissements/{id}")
    public ResponseEntity<Void> deleteEtablissement(@PathVariable Long id) {
        log.debug("REST request to delete Etablissement : {}", id);
        etablissementRepository.deleteById(id);
        etablissementSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/etablissements?query=:query} : search for the etablissement corresponding
     * to the query.
     *
     * @param query the query of the etablissement search.
     * @return the result of the search.
     */
    @GetMapping("/_search/etablissements")
    public List<Etablissement> searchEtablissements(@RequestParam String query) {
        log.debug("REST request to search Etablissements for query {}", query);
        return StreamSupport
            .stream(etablissementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
