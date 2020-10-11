package com.planeta.pfum.domain;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Annonce.
 */
@Entity
@Table(name = "annonce")
@org.springframework.data.elasticsearch.annotations.Document(indexName = "annonce")
public class Annonce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Lob
    @Column(name = "annonce")
    private String annonce;

    @Lob
    @Column(name = "commentaire")
    private String commentaire;

    @OneToMany(mappedBy = "annonce")
    private Set<EspaceEtudiant> espaceEtudiants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnnonce() {
        return annonce;
    }

    public Annonce annonce(String annonce) {
        this.annonce = annonce;
        return this;
    }

    public void setAnnonce(String annonce) {
        this.annonce = annonce;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Annonce commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Set<EspaceEtudiant> getEspaceEtudiants() {
        return espaceEtudiants;
    }

    public Annonce espaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
        return this;
    }

    public Annonce addEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.add(espaceEtudiant);
        espaceEtudiant.setAnnonce(this);
        return this;
    }

    public Annonce removeEspaceEtudiant(EspaceEtudiant espaceEtudiant) {
        this.espaceEtudiants.remove(espaceEtudiant);
        espaceEtudiant.setAnnonce(null);
        return this;
    }

    public void setEspaceEtudiants(Set<EspaceEtudiant> espaceEtudiants) {
        this.espaceEtudiants = espaceEtudiants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Annonce)) {
            return false;
        }
        return id != null && id.equals(((Annonce) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Annonce{" +
            "id=" + getId() +
            ", annonce='" + getAnnonce() + "'" +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
