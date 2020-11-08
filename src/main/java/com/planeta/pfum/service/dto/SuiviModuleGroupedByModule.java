package com.planeta.pfum.service.dto;

public class SuiviModuleGroupedByModule {

	private long id;
	private String nomModule;
	private int volumeHoraire;
	private long cumul;

	public SuiviModuleGroupedByModule(long id, String nomModule, int volumeHoraire, long cumul) {
		super();
		this.id = id;
	    this.nomModule = nomModule;
		this.volumeHoraire = volumeHoraire;
		this.cumul = cumul;
	}

	public String getNomModule() {
		return nomModule;
	}

	public void setNomModule(String nomModule) {
		this.nomModule = nomModule;
	}

	public int getVolumeHoraire() {
		return volumeHoraire;
	}

	public void setVolumeHoraire(int volumeHoraire) {
		this.volumeHoraire = volumeHoraire;
	}

	public long getCumul() {
		return cumul;
	}

	public void setCumul(long cumul) {
		this.cumul = cumul;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

}
