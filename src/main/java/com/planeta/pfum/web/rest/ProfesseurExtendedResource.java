package com.planeta.pfum.web.rest;

import java.net.URI;
import java.net.URISyntaxException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.repository.ProfesseurRepository;
import com.planeta.pfum.security.AuthoritiesConstants;
import com.planeta.pfum.service.UserExtendedService;
import com.planeta.pfum.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;

@RestController
@RequestMapping("/api")

public class ProfesseurExtendedResource {
	private final Logger log = LoggerFactory.getLogger(ProfesseurExtendedResource.class);

	private static final String ENTITY_NAME = "professeur";

	private final ProfesseurRepository professeurRepository;

	private final UserExtendedService userService;

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	public ProfesseurExtendedResource(ProfesseurRepository professeurRepository, UserExtendedService userService) {
		this.professeurRepository = professeurRepository;
		this.userService = userService;
	}

	/**
	 * {@code POST  /professeurs} : Create a new professeur.
	 *
	 * @param professeur the professeur to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new professeur, or with status {@code 400 (Bad Request)} if
	 *         the professeur has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/extended/professeurs")
	public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) throws URISyntaxException {
		log.debug("REST request to save Professeur : {}", professeur);
		if (professeur.getId() != null) {
			throw new BadRequestAlertException("A new professeur cannot already have an ID", ENTITY_NAME, "idexists");
		}

		// Creation d'un compte USER pour se connecter
		User newUser = userService.createUserForActeur(professeur.getEmail(), professeur.getNom(), professeur.getPrenom(),AuthoritiesConstants.PROF);

		professeur.setUser(newUser);

		Professeur result = professeurRepository.save(professeur);
//    professeurSearchRepository.save(result);
		return ResponseEntity
				.created(new URI("/api/extended/professeurs/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}
}
