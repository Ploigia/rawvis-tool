package gr.ploigia.rawvis_api.web.rest;

import gr.ploigia.rawvis_api.domain.ValinorOptions;
import gr.ploigia.rawvis_api.repository.ValinorOptionsRepository;
import gr.ploigia.rawvis_api.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ploigia.rawvis_api.domain.ValinorOptions}.
 */
@RestController
@RequestMapping("/api")
public class ValinorOptionsResource {

    private final Logger log = LoggerFactory.getLogger(ValinorOptionsResource.class);

    private static final String ENTITY_NAME = "valinorOptions";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValinorOptionsRepository valinorOptionsRepository;

    public ValinorOptionsResource(ValinorOptionsRepository valinorOptionsRepository) {
        this.valinorOptionsRepository = valinorOptionsRepository;
    }

    /**
     * {@code POST  /valinor-options} : Create a new valinorOptions.
     *
     * @param valinorOptions the valinorOptions to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valinorOptions, or with status {@code 400 (Bad Request)} if the valinorOptions has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valinor-options")
    public ResponseEntity<ValinorOptions> createValinorOptions(@RequestBody ValinorOptions valinorOptions) throws URISyntaxException {
        log.debug("REST request to save ValinorOptions : {}", valinorOptions);
        if (valinorOptions.getId() != null) {
            throw new BadRequestAlertException("A new valinorOptions cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ValinorOptions result = valinorOptionsRepository.save(valinorOptions);
        return ResponseEntity.created(new URI("/api/valinor-options/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valinor-options} : Updates an existing valinorOptions.
     *
     * @param valinorOptions the valinorOptions to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valinorOptions,
     * or with status {@code 400 (Bad Request)} if the valinorOptions is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valinorOptions couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valinor-options")
    public ResponseEntity<ValinorOptions> updateValinorOptions(@RequestBody ValinorOptions valinorOptions) throws URISyntaxException {
        log.debug("REST request to update ValinorOptions : {}", valinorOptions);
        if (valinorOptions.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ValinorOptions result = valinorOptionsRepository.save(valinorOptions);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, valinorOptions.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /valinor-options} : get all the valinorOptions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valinorOptions in body.
     */
    @GetMapping("/valinor-options")
    public List<ValinorOptions> getAllValinorOptions() {
        log.debug("REST request to get all ValinorOptions");
        return valinorOptionsRepository.findAll();
    }

    /**
     * {@code GET  /valinor-options/:id} : get the "id" valinorOptions.
     *
     * @param id the id of the valinorOptions to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valinorOptions, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valinor-options/{id}")
    public ResponseEntity<ValinorOptions> getValinorOptions(@PathVariable Long id) {
        log.debug("REST request to get ValinorOptions : {}", id);
        Optional<ValinorOptions> valinorOptions = valinorOptionsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(valinorOptions);
    }

    /**
     * {@code DELETE  /valinor-options/:id} : delete the "id" valinorOptions.
     *
     * @param id the id of the valinorOptions to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valinor-options/{id}")
    public ResponseEntity<Void> deleteValinorOptions(@PathVariable Long id) {
        log.debug("REST request to delete ValinorOptions : {}", id);
        valinorOptionsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
