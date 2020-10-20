package com.planeta.pfum.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.planeta.pfum.domain.enumeration.Devise;

/**
 * A ModalitePaiement.
 */
@Entity
@Table(name = "modalite_paiement")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "modalitepaiement")
public class ModalitePaiement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "modalite")
    private String modalite;

    @Column(name = "cout_programmettc")
    private Double coutProgrammettc;

    @Column(name = "cout_programmettc_devise")
    private Double coutProgrammettcDevise;

    @Column(name = "remise_niveau_1")
    private Integer remiseNiveau1;

    @Column(name = "remise_niveau_2")
    private Integer remiseNiveau2;

    @Enumerated(EnumType.STRING)
    @Column(name = "devise")
    private Devise devise;

    @OneToMany(mappedBy = "modalite")
    private Set<EtudiantsLicence> etudiantsLicences = new HashSet<>();

    @OneToMany(mappedBy = "modalite")
    private Set<EtudiantsMaster> etudiantsMasters = new HashSet<>();

    @OneToMany(mappedBy = "modalite")
    private Set<EtudiantsExecutif> etudiantsExecutifs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModalite() {
        return modalite;
    }

    public ModalitePaiement modalite(String modalite) {
        this.modalite = modalite;
        return this;
    }

    public void setModalite(String modalite) {
        this.modalite = modalite;
    }

    public Double getCoutProgrammettc() {
        return coutProgrammettc;
    }

    public ModalitePaiement coutProgrammettc(Double coutProgrammettc) {
        this.coutProgrammettc = coutProgrammettc;
        return this;
    }

    public void setCoutProgrammettc(Double coutProgrammettc) {
        this.coutProgrammettc = coutProgrammettc;
    }

    public Double getCoutProgrammettcDevise() {
        return coutProgrammettcDevise;
    }

    public ModalitePaiement coutProgrammettcDevise(Double coutProgrammettcDevise) {
        this.coutProgrammettcDevise = coutProgrammettcDevise;
        return this;
    }

    public void setCoutProgrammettcDevise(Double coutProgrammettcDevise) {
        this.coutProgrammettcDevise = coutProgrammettcDevise;
    }

    public Integer getRemiseNiveau1() {
        return remiseNiveau1;
    }

    public ModalitePaiement remiseNiveau1(Integer remiseNiveau1) {
        this.remiseNiveau1 = remiseNiveau1;
        return this;
    }

    public void setRemiseNiveau1(Integer remiseNiveau1) {
        this.remiseNiveau1 = remiseNiveau1;
    }

    public Integer getRemiseNiveau2() {
        return remiseNiveau2;
    }

    public ModalitePaiement remiseNiveau2(Integer remiseNiveau2) {
        this.remiseNiveau2 = remiseNiveau2;
        return this;
    }

    public void setRemiseNiveau2(Integer remiseNiveau2) {
        this.remiseNiveau2 = remiseNiveau2;
    }

    public Devise getDevise() {
        return devise;
    }

    public ModalitePaiement devise(Devise devise) {
        this.devise = devise;
        return this;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
    }

    public Set<EtudiantsLicence> getEtudiantsLicences() {
        return etudiantsLicences;
    }

    public ModalitePaiement etudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
        return this;
    }

    public ModalitePaiement addEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.add(etudiantsLicence);
        etudiantsLicence.setModalite(this);
        return this;
    }

    public ModalitePaiement removeEtudiantsLicence(EtudiantsLicence etudiantsLicence) {
        this.etudiantsLicences.remove(etudiantsLicence);
        etudiantsLicence.setModalite(null);
        return this;
    }

    public void setEtudiantsLicences(Set<EtudiantsLicence> etudiantsLicences) {
        this.etudiantsLicences = etudiantsLicences;
    }

    public Set<EtudiantsMaster> getEtudiantsMasters() {
        return etudiantsMasters;
    }

    public ModalitePaiement etudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
        return this;
    }

    public ModalitePaiement addEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.add(etudiantsMaster);
        etudiantsMaster.setModalite(this);
        return this;
    }

    public ModalitePaiement removeEtudiantsMaster(EtudiantsMaster etudiantsMaster) {
        this.etudiantsMasters.remove(etudiantsMaster);
        etudiantsMaster.setModalite(null);
        return this;
    }

    public void setEtudiantsMasters(Set<EtudiantsMaster> etudiantsMasters) {
        this.etudiantsMasters = etudiantsMasters;
    }

    public Set<EtudiantsExecutif> getEtudiantsExecutifs() {
        return etudiantsExecutifs;
    }

    public ModalitePaiement etudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
        return this;
    }

    public ModalitePaiement addEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.add(etudiantsExecutif);
        etudiantsExecutif.setModalite(this);
        return this;
    }

    public ModalitePaiement removeEtudiantsExecutif(EtudiantsExecutif etudiantsExecutif) {
        this.etudiantsExecutifs.remove(etudiantsExecutif);
        etudiantsExecutif.setModalite(null);
        return this;
    }

    public void setEtudiantsExecutifs(Set<EtudiantsExecutif> etudiantsExecutifs) {
        this.etudiantsExecutifs = etudiantsExecutifs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ModalitePaiement)) {
            return false;
        }
        return id != null && id.equals(((ModalitePaiement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ModalitePaiement{" +
            "id=" + getId() +
            ", modalite='" + getModalite() + "'" +
            ", coutProgrammettc=" + getCoutProgrammettc() +
            ", coutProgrammettcDevise=" + getCoutProgrammettcDevise() +
            ", remiseNiveau1=" + getRemiseNiveau1() +
            ", remiseNiveau2=" + getRemiseNiveau2() +
            ", devise='" + getDevise() + "'" +
            "}";
    }
}
