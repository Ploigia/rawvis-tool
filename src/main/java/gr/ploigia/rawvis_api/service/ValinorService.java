package gr.ploigia.rawvis_api.service;

import gr.ploigia.rawvis.Point;
import gr.ploigia.rawvis.Rectangle;
import gr.ploigia.rawvis_api.domain.ValinorOptions;

import java.util.List;
import java.util.Optional;

public interface ValinorService {

    ValinorOptions init(ValinorOptions options);

    Optional<List<Point>> getDatapoints(Long id, Query query);

}
