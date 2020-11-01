package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.Absence;
import com.planeta.pfum.domain.FicheAbsence;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Programme;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.FicheAbsenceRepository;
import com.planeta.pfum.repository.UserRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.security.SecurityUtils;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.planeta.pfum.domain.FicheAbsence}.
 */
@RestController
@RequestMapping("/api")
public class FicheAbsenceResource {

    private final Logger log = LoggerFactory.getLogger(FicheAbsenceResource.class);

    private static final String ENTITY_NAME = "ficheAbsence";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FicheAbsenceRepository ficheAbsenceRepository;
    
    private final UserRepository userRepository;

    

    public FicheAbsenceResource(FicheAbsenceRepository ficheAbsenceRepository,UserRepository userRepository) {
        this.ficheAbsenceRepository = ficheAbsenceRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /fiche-absences} : Create a new ficheAbsence.
     *
     * @param ficheAbsence the ficheAbsence to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ficheAbsence, or with status {@code 400 (Bad Request)} if the ficheAbsence has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fiche-absences")
    public ResponseEntity<FicheAbsence> createFicheAbsence(@Valid @RequestBody FicheAbsence ficheAbsence) throws URISyntaxException {
        log.debug("REST request to save FicheAbsence : {}", ficheAbsence);
        if (ficheAbsence.getId() != null) {
            throw new BadRequestAlertException("A new ficheAbsence cannot already have an ID", ENTITY_NAME, "idexists");
        }
        for(Absence absence:ficheAbsence.getAbsences()) {
        	absence.setFicheAbsence(ficheAbsence);
        }
        
		Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
		ficheAbsence.setUser(user.get());
        
        FicheAbsence result = ficheAbsenceRepository.save(ficheAbsence);
        return ResponseEntity.created(new URI("/api/fiche-absences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fiche-absences} : Updates an existing ficheAbsence.
     *
     * @param ficheAbsence the ficheAbsence to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ficheAbsence,
     * or with status {@code 400 (Bad Request)} if the ficheAbsence is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ficheAbsence couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fiche-absences")
    public ResponseEntity<FicheAbsence> updateFicheAbsence(@Valid @RequestBody FicheAbsence ficheAbsence) throws URISyntaxException {
        log.debug("REST request to update FicheAbsence : {}", ficheAbsence);
        if (ficheAbsence.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
       
        FicheAbsence result = ficheAbsenceRepository.save(ficheAbsence);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ficheAbsence.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fiche-absences} : get all the ficheAbsences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ficheAbsences in body.
     */
    @GetMapping("/fiche-absences")
    public List<FicheAbsence> getAllFicheAbsences() {
        log.debug("REST request to get all FicheAbsences");
        
        
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return ficheAbsenceRepository.findAll();
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
//			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			return ficheAbsenceRepository.findAllByUserId(user.get().getId());
		}
   
    }

    
    @GetMapping("/fiche-absences/module/{module}")
    public List<FicheAbsence> getAllFicheAbsencesByModule(@PathVariable String module) {
        log.debug("REST request to get all FicheAbsences");
        
        
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return ficheAbsenceRepository.findAllByModuleId(Long.valueOf(module));
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
//			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			return ficheAbsenceRepository.findAllByUserIdAndModuleId(user.get().getId(),Long.valueOf(module));
		}
   
    }
    
    @GetMapping("/fiche-absences/programme/{programme}")
    public List<FicheAbsence> getAllFicheAbsencesByProgramme(@PathVariable Programme programme) {
        log.debug("REST request to get all FicheAbsences");
        
        
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return ficheAbsenceRepository.findAllByProgramme(programme);
		} else {
			Optional<User> user = userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get());
//			Optional<Professeur> p = professeurRepository.findOneByUserId(user.get().getId());
			return ficheAbsenceRepository.findAllByUserIdAndProgramme(user.get().getId(),programme);
		}
   
    }
    
    
    /**
     * {@code GET  /fiche-absences/:id} : get the "id" ficheAbsence.
     *
     * @param id the id of the ficheAbsence to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ficheAbsence, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fiche-absences/{id}")
    public ResponseEntity<FicheAbsence> getFicheAbsence(@PathVariable Long id) {
        log.debug("REST request to get FicheAbsence : {}", id);
        
        Optional<FicheAbsence> ficheAbsence = ficheAbsenceRepository.findAllWithAbsenceById(id);
        return ResponseUtil.wrapOrNotFound(ficheAbsence);
    }

    /**
     * {@code DELETE  /fiche-absences/:id} : delete the "id" ficheAbsence.
     *
     * @param id the id of the ficheAbsence to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fiche-absences/{id}")
    public ResponseEntity<Void> deleteFicheAbsence(@PathVariable Long id) {
        log.debug("REST request to delete FicheAbsence : {}", id);
        ficheAbsenceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


}
