package com.planeta.pfum.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.enumeration.Semestre;
import com.planeta.pfum.repository.ModuleExtendedRepository;


@RestController
@RequestMapping("/api")
public class ModuleExtendedResource {

    private final Logger log = LoggerFactory.getLogger(ModuleResource.class);

    private static final String ENTITY_NAME = "module";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModuleExtendedRepository moduleRepository;


    public ModuleExtendedResource(ModuleExtendedRepository moduleRepository ) {
        this.moduleRepository = moduleRepository;
    }
    @GetMapping("/extended/modules/semestre/{sem}")
    public List<Module> getModulesBySemestre(@PathVariable Semestre sem) {
        log.debug("REST request to get Modules : {}", sem);
        return moduleRepository.findAllBySemestre(sem);
    }
    
}
