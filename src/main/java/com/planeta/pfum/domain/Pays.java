package com.planeta.pfum.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "pays")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pays {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(name = "code")
	    private String code;
	    
	    @Column(name = "alpha2")
	    private String alpha2;
	    
	    @Column(name = "alpha3")
	    private String alpha3;
	    
	    @Column(name = "nom_en_gb")
	    private String nom_en_gb;
	    
	    @Column(name = "nom_fr_fr")
	    private String nom_fr_fr;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getCode() {
			return code;
		}

		public void setCode(String code) {
			this.code = code;
		}

		public String getAlpha2() {
			return alpha2;
		}

		public void setAlpha2(String alpha2) {
			this.alpha2 = alpha2;
		}

		public String getAlpha3() {
			return alpha3;
		}

		public void setAlpha3(String alpha3) {
			this.alpha3 = alpha3;
		}

		public String getNom_en_gb() {
			return nom_en_gb;
		}

		public void setNom_en_gb(String nom_en_gb) {
			this.nom_en_gb = nom_en_gb;
		}

		public String getNom_fr_fr() {
			return nom_fr_fr;
		}

		public void setNom_fr_fr(String nom_fr_fr) {
			this.nom_fr_fr = nom_fr_fr;
		}
	    
	    
	    

}
