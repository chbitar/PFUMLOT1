package com.planeta.pfum.service.dto;

import java.io.Serializable;
import java.time.Instant;

import com.planeta.pfum.domain.Module;
import com.planeta.pfum.domain.Professeur;
import com.planeta.pfum.domain.SuiviModule;
import com.planeta.pfum.domain.User;
import com.planeta.pfum.domain.enumeration.Semestre;

public class SuiviModuleDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private Semestre semestre;

	private String descriptif;

	private String observations;

	private Instant date;

	private Instant debutCreneau;

	private Instant finCreneau;

	private Integer duree;

	private User user;

	private Module module;

	private Professeur professeur;
	
	public SuiviModuleDTO(SuiviModule suiviModule) {
		super();
		this.id = suiviModule.getId();
		this.semestre = suiviModule.getSemestre();
		this.descriptif = suiviModule.getDescriptif();
		this.observations = suiviModule.getObservations();
		this.date = suiviModule.getDate();
		this.debutCreneau = suiviModule.getDebutCreneau();
		this.finCreneau = suiviModule.getFinCreneau();
		this.duree = suiviModule.getDuree();
		this.user = getUser();
		this.module = suiviModule.getModule();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Semestre getSemestre() {
		return semestre;
	}

	public void setSemestre(Semestre semestre) {
		this.semestre = semestre;
	}

	public String getDescriptif() {
		return descriptif;
	}

	public void setDescriptif(String descriptif) {
		this.descriptif = descriptif;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public Instant getDebutCreneau() {
		return debutCreneau;
	}

	public void setDebutCreneau(Instant debutCreneau) {
		this.debutCreneau = debutCreneau;
	}

	public Instant getFinCreneau() {
		return finCreneau;
	}

	public void setFinCreneau(Instant finCreneau) {
		this.finCreneau = finCreneau;
	}

	public Integer getDuree() {
		return duree;
	}

	public void setDuree(Integer duree) {
		this.duree = duree;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}

	public Professeur getProfesseur() {
		return professeur;
	}

	public void setProfesseur(Professeur professeur) {
		this.professeur = professeur;
	}

}
