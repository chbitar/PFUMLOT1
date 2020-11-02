package com.planeta.pfum.domain;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AnneeInscription.
 */
@Entity
@Table(name = "annee_inscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AnneeInscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "annee")
    private String annee;

    @OneToMany(mappedBy = "anneeInscription")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CalendrierModule> calendrierModules = new HashSet<>();

    @OneToMany(mappedBy = "anneeInscription")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EtudiantsExecutif> etudiantsExecutifs = new HashSet<>();

    @OneToMany(mappedBy = "anneeInscription")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EtudiantsLicence> etudiantsLicences = new HashSet<>();

    @OneToMany(mappedBy = "anneeInscription")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EtudiantsMaster> etudiantsMasters = new HashSet<>();

    @OneToMany(mappedBy = "anneeInscription")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Filiere> filieres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnee() {
        return annee;
    }

    public AnneeInscription annee(String annee) {
        this.annee = annee;
        return this;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Set<CalendrierModule> getCalendrierModules() {
        return calendrierModules;
    }

    public AnneeInscription calendrierModules(Set<CalendrierModule> calendrierModules) {
        this.calendrierModules = calendrierModules;
        return this;
    }

    public AnneeInscription addCalendrierModule(CalendrierModule calendrierModule) {
        this.calendrierModules.add(calendrierModule);
        calendrierModule.setAnneeInscription(this);
        return this;
    }

    public AnneeInscription removeCalendrierModule(CalendrierModule calendrierModule) {
        this.calendrierModules.remove(calendrierModule);
        calendrierModule.setAnneeInscription(null);
        return this;
    }

    public void setCalendrierModules(Set<CalendrierModule> calendrierModules) {
        this.calendrierModules = calendrierModules;
    }

    public Set<EtudiantsExecutif> getEtudiantsExecutifs() {
        return etudiantsExecutifs;
    }

    public AnneeInscription etudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
        return this;
    }

    public AnneeInscription addEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.add(etudiantsExecutif);
        etudiantsExecutif.setAnneeInscription(this);
        return this;
    }

    public AnneeInscription removeEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.remove(etudiantsExecutif);
        etudiantsExecutif.setAnneeInscription(null);
        return this;
    }

    public void setEtudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
    }

    public Set<EtudiantsLicence> getEtudiantsLicences() {
        return etudiantsLicences;
    }

    public AnneeInscription etudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
        return this;
    }

    public AnneeInscription addEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.add(etudiantsLicence);
        etudiantsLicence.setAnneeInscription(this);
        return this;
    }

    public AnneeInscription removeEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.remove(etudiantsLicence);
        etudiantsLicence.setAnneeInscription(null);
        return this;
    }

    public void setEtudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
    }

    public Set<EtudiantsMaster> getEtudiantsMasters() {
        return etudiantsMasters;
    }

    public AnneeInscription etudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
        return this;
    }

    public AnneeInscription addEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.add(etudiantsMaster);
        etudiantsMaster.setAnneeInscription(this);
        return this;
    }

    public AnneeInscription removeEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.remove(etudiantsMaster);
        etudiantsMaster.setAnneeInscription(null);
        return this;
    }

    public void setEtudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public AnneeInscription filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public AnneeInscription addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.setAnneeInscription(this);
        return this;
    }

    public AnneeInscription removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.setAnneeInscription(null);
        return this;
    }

    public void setFilieres(Set<Filiere> filieres) {
        this.filieres = filieres;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnneeInscription)) {
            return false;
        }
        return id != null && id.equals(((AnneeInscription) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AnneeInscription{" +
            "id=" + getId() +
            ", annee='" + getAnnee() + "'" +
            "}";
    }
}
