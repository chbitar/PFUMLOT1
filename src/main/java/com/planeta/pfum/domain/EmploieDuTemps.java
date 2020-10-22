package com.planeta.pfum.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.planeta.pfum.domain.enumeration.Programme;

/**
 * A EmploieDuTemps.
 */
@Entity
@Table(name = "emploie_du_temps")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmploieDuTemps implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "emploie_du_temps")
    private byte[] emploieDuTemps;

    @Column(name = "emploie_du_temps_content_type")
    private String emploieDuTempsContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "programme")
    private Programme programme;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getEmploieDuTemps() {
        return emploieDuTemps;
    }

    public EmploieDuTemps emploieDuTemps(byte[] emploieDuTemps) {
        this.emploieDuTemps = emploieDuTemps;
        return this;
    }

    public void setEmploieDuTemps(byte[] emploieDuTemps) {
        this.emploieDuTemps = emploieDuTemps;
    }

    public String getEmploieDuTempsContentType() {
        return emploieDuTempsContentType;
    }

    public EmploieDuTemps emploieDuTempsContentType(String emploieDuTempsContentType) {
        this.emploieDuTempsContentType = emploieDuTempsContentType;
        return this;
    }

    public void setEmploieDuTempsContentType(String emploieDuTempsContentType) {
        this.emploieDuTempsContentType = emploieDuTempsContentType;
    }

    public Programme getProgramme() {
        return programme;
    }

    public EmploieDuTemps programme(Programme programme) {
        this.programme = programme;
        return this;
    }

    public void setProgramme(Programme programme) {
        this.programme = programme;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmploieDuTemps)) {
            return false;
        }
        return id != null && id.equals(((EmploieDuTemps) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EmploieDuTemps{" +
            "id=" + getId() +
            ", emploieDuTemps='" + getEmploieDuTemps() + "'" +
            ", emploieDuTempsContentType='" + getEmploieDuTempsContentType() + "'" +
            ", programme='" + getProgramme() + "'" +
            "}";
    }
}
