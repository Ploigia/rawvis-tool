package gr.ploigia.rawvis_api.web.rest;

import gr.ploigia.rawvis.Point;
import gr.ploigia.rawvis.Rectangle;
import gr.ploigia.rawvis_api.domain.ValinorOptions;
import gr.ploigia.rawvis_api.repository.ValinorOptionsRepository;
import gr.ploigia.rawvis_api.service.Query;
import gr.ploigia.rawvis_api.service.ValinorService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * ValinorControllerResource controller
 */
@RestController
@RequestMapping("/api/valinor")
public class ValinorController {

    private final Logger log = LoggerFactory.getLogger(ValinorController.class);

    private final ValinorService valinorService;

    public ValinorController(ValinorService valinorService) {
        this.valinorService = valinorService;
    }

    /**
     * POST init
     */
    @PostMapping("/init")
    public ValinorOptions init(ValinorOptions options) {
        return valinorService.init(options);
    }


    @PostMapping("/{id}/query")
    public ResponseEntity<List<Point>> getDatapoints(@PathVariable Long id, @RequestBody Query query) {
        log.debug("REST request to get ValinorOptions : {}", id);
        return ResponseUtil.wrapOrNotFound(valinorService.getDatapoints(id, query));
    }

}
