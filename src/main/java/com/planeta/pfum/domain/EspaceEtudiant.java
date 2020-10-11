package com.planeta.pfum.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A EspaceEtudiant.
 */
@Entity
@Table(name = "espace_etudiant")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "espaceetudiant")
public class EspaceEtudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Lob
    @Column(name = "emploi_du_temps")
    private byte[] emploiDuTemps;

    @Column(name = "emploi_du_temps_content_type")
    private String emploiDuTempsContentType;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private EtudiantsLicence etudiantLicence;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private EtudiantsMaster etudiantMaster;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private EtudiantsExecutif etudiantExecutif;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private CalendrierModule calendrier;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private Absence absence;

    @ManyToOne
    @JsonIgnoreProperties("espaceEtudiants")
    private Annonce annonce;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getEmploiDuTemps() {
        return emploiDuTemps;
    }

    public EspaceEtudiant emploiDuTemps(byte[] emploiDuTemps) {
        this.emploiDuTemps = emploiDuTemps;
        return this;
    }

    public void setEmploiDuTemps(byte[] emploiDuTemps) {
        this.emploiDuTemps = emploiDuTemps;
    }

    public String getEmploiDuTempsContentType() {
        return emploiDuTempsContentType;
    }

    public EspaceEtudiant emploiDuTempsContentType(String emploiDuTempsContentType) {
        this.emploiDuTempsContentType = emploiDuTempsContentType;
        return this;
    }

    public void setEmploiDuTempsContentType(String emploiDuTempsContentType) {
        this.emploiDuTempsContentType = emploiDuTempsContentType;
    }

    public User getUser() {
        return user;
    }

    public EspaceEtudiant user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public EtudiantsLicence getEtudiantLicence() {
        return etudiantLicence;
    }

    public EspaceEtudiant etudiantLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantLicence = etudiantsLicence;
        return this;
    }

    public void setEtudiantLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantLicence = etudiantsLicence;
    }

    public EtudiantsMaster getEtudiantMaster() {
        return etudiantMaster;
    }

    public EspaceEtudiant etudiantMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantMaster = etudiantsMaster;
        return this;
    }

    public void setEtudiantMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantMaster = etudiantsMaster;
    }

    public EtudiantsExecutif getEtudiantExecutif() {
        return etudiantExecutif;
    }

    public EspaceEtudiant etudiantExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantExecutif = etudiantsExecutif;
        return this;
    }

    public void setEtudiantExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantExecutif = etudiantsExecutif;
    }

    public CalendrierModule getCalendrier() {
        return calendrier;
    }

    public EspaceEtudiant calendrier(CalendrierModule calendrierModule) {
        this.calendrier = calendrierModule;
        return this;
    }

    public void setCalendrier(CalendrierModule calendrierModule) {
        this.calendrier = calendrierModule;
    }

    public Absence getAbsence() {
        return absence;
    }

    public EspaceEtudiant absence(Absence absence) {
        this.absence = absence;
        return this;
    }

    public void setAbsence(Absence absence) {
        this.absence = absence;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public EspaceEtudiant annonce(Annonce annonce) {
        this.annonce = annonce;
        return this;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EspaceEtudiant)) {
            return false;
        }
        return id != null && id.equals(((EspaceEtudiant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EspaceEtudiant{" +
            "id=" + getId() +
            ", emploiDuTemps='" + getEmploiDuTemps() + "'" +
            ", emploiDuTempsContentType='" + getEmploiDuTempsContentType() + "'" +
            "}";
    }
}
