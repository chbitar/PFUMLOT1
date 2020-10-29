package com.planeta.pfum.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.Filiere;
import com.planeta.pfum.repository.FiliereExtendedRepository;

@RestController
@RequestMapping("/api/extended")
public class FiliereExtendedResource {
	private final Logger log = LoggerFactory.getLogger(AffectationModuleExtendedResource.class);

	private static final String ENTITY_NAME = "filiere";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final FiliereExtendedRepository filiereRepository;

	public FiliereExtendedResource(FiliereExtendedRepository filiereRepository) {
		this.filiereRepository = filiereRepository;
	}

	@GetMapping("/filieres/etablissement/{etab}")
	public List<Filiere> getAllFilieresByEtablissement(@PathVariable Long etab) {
		log.debug("REST request to get all Filieres");
		return filiereRepository.findAllByEtablissementId(etab);
	}

}
