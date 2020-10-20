package com.planeta.pfum.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.AffectationModule;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.AffectationModuleExtendedRepository;

@RestController
@RequestMapping("/api")
public class AffectationModuleExtendedResource {

	private final Logger log = LoggerFactory.getLogger(AffectationModuleExtendedResource.class);

	private static final String ENTITY_NAME = "affectationModule";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final AffectationModuleExtendedRepository affectationModuleRepository;

	public AffectationModuleExtendedResource(AffectationModuleExtendedRepository affectationModuleRepository) {
		this.affectationModuleRepository = affectationModuleRepository;
	}

	@GetMapping("/extended/affectation-modules/semestre/{sem}")
	public List<AffectationModule> getAllAffectaionModulesBySemestre(@PathVariable Semestre sem) {
		log.debug("REST request to get all AffectaionModules");
		return affectationModuleRepository.findAllBySemestre(sem);
	}

}
