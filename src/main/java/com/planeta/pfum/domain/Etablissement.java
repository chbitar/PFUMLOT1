package com.planeta.pfum.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Etablissement.
 */
@Entity
@Table(name = "etablissement")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "etablissement")
public class Etablissement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "nom_ecole")
    private String nomEcole;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "rc")
    private String rc;

    @Column(name = "ice")
    private String ice;

    @Column(name = "tp")
    private String tp;

    @Column(name = "identite_fiche")
    private String identiteFiche;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @OneToMany(mappedBy = "etablissement")
    private Set<Filiere> filieres = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomEcole() {
        return nomEcole;
    }

    public Etablissement nomEcole(String nomEcole) {
        this.nomEcole = nomEcole;
        return this;
    }

    public void setNomEcole(String nomEcole) {
        this.nomEcole = nomEcole;
    }

    public String getAdresse() {
        return adresse;
    }

    public Etablissement adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getRc() {
        return rc;
    }

    public Etablissement rc(String rc) {
        this.rc = rc;
        return this;
    }

    public void setRc(String rc) {
        this.rc = rc;
    }

    public String getIce() {
        return ice;
    }

    public Etablissement ice(String ice) {
        this.ice = ice;
        return this;
    }

    public void setIce(String ice) {
        this.ice = ice;
    }

    public String getTp() {
        return tp;
    }

    public Etablissement tp(String tp) {
        this.tp = tp;
        return this;
    }

    public void setTp(String tp) {
        this.tp = tp;
    }

    public String getIdentiteFiche() {
        return identiteFiche;
    }

    public Etablissement identiteFiche(String identiteFiche) {
        this.identiteFiche = identiteFiche;
        return this;
    }

    public void setIdentiteFiche(String identiteFiche) {
        this.identiteFiche = identiteFiche;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Etablissement logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Etablissement logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Set<Filiere> getFilieres() {
        return filieres;
    }

    public Etablissement filieres(Set<Filiere> filieres) {
        this.filieres = filieres;
        return this;
    }

    public Etablissement addFiliere(Filiere filiere) {
        this.filieres.add(filiere);
        filiere.setEtablissement(this);
        return this;
    }

    public Etablissement removeFiliere(Filiere filiere) {
        this.filieres.remove(filiere);
        filiere.setEtablissement(null);
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
        if (!(o instanceof Etablissement)) {
            return false;
        }
        return id != null && id.equals(((Etablissement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Etablissement{" +
            "id=" + getId() +
            ", nomEcole='" + getNomEcole() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", rc='" + getRc() + "'" +
            ", ice='" + getIce() + "'" +
            ", tp='" + getTp() + "'" +
            ", identiteFiche='" + getIdentiteFiche() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            "}";
    }
}
